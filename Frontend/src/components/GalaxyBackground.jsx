import { useEffect, useRef } from "react";

export default function GalaxyBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const zoom = useRef({ current: 1.0, target: 1.0 });
  const pan = useRef({ currentX: 0, currentY: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let stars = [];
    const starCount = 1300;
    const perspective = 450;
    
    // Core centers align with the profile avatar dynamically
    let galaxyCenter = { x: window.innerWidth * 0.73, y: window.innerHeight * 0.5 };
    
    const updateGalaxyCenter = () => {
      if (window.innerWidth >= 1024) {
        galaxyCenter.x = window.innerWidth * 0.73;
        galaxyCenter.y = window.innerHeight * 0.5;
      } else {
        galaxyCenter.x = window.innerWidth * 0.5;
        galaxyCenter.y = window.innerHeight * 0.33;
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      updateGalaxyCenter();
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Formulate stars in a spiral disc
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        // 25% inside core, 75% in arms
        this.isCore = Math.random() < 0.22;
        this.r = this.isCore 
          ? Math.random() * 45 
          : Math.random() * 320 + 40;

        this.arm = Math.random() > 0.5 ? 0 : 1;
        // Logarithmic spiral math: angle increases with distance
        this.angle = 2.4 * Math.log(this.r) + this.arm * Math.PI + (Math.random() - 0.5) * 0.28;
        
        // Z thickness (bulge in center, flat disk on outer edges)
        const thickness = this.isCore ? 35 : 30 * (1 - this.r / 360);
        this.z = (Math.random() - 0.5) * thickness;

        this.size = Math.random() * 1.2 + 0.6;
        this.speed = (Math.random() * 0.0005 + 0.0008) * (150 / this.r); // faster near core
        
        // Assign color gradient relative to radius
        if (this.isCore) {
          // Warm core stars
          this.color = Math.random() > 0.3 
            ? `rgba(255, 235, 179, ${Math.random() * 0.8 + 0.2})` 
            : `rgba(255, 255, 255, ${Math.random() * 0.9 + 0.1})`;
        } else {
          // Cool spiral arm stars (cyan, blue, purple, gold highlights)
          const colorSelector = Math.random();
          if (colorSelector < 0.45) {
            this.color = `rgba(56, 189, 248, ${Math.random() * 0.75 + 0.15})`; // cyan
          } else if (colorSelector < 0.75) {
            this.color = `rgba(99, 102, 241, ${Math.random() * 0.6 + 0.15})`; // purple
          } else {
            this.color = `rgba(253, 224, 71, ${Math.random() * 0.65 + 0.15})`; // gold
          }
        }
      }

      update() {
        this.angle += this.speed * 0.7;
        
        // 3D Cartesian coordinates
        this.x3d = this.r * Math.cos(this.angle);
        this.y3d = this.z;
        this.z3d = this.r * Math.sin(this.angle);
      }
    }

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    let continuousAngle = 0;

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Interpolate camera values (Lerp)
      zoom.current += (zoom.target - zoom.current) * 0.045;
      pan.currentX += (pan.targetX - pan.currentX) * 0.045;
      pan.currentY += (pan.targetY - pan.currentY) * 0.045;
      
      // Interpolate mouse coordinates for 3D tilt offsets
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      const tiltX = mouse.current.y * 0.0005; // rotation along X-axis
      const tiltY = mouse.current.x * 0.0005; // rotation along Y-axis
      
      continuousAngle += 0.0015; // Slow rotation of the disc

      stars.forEach((star) => {
        star.update();

        // 1. Rotate around Y-axis (continuous rotation)
        let x1 = star.x3d * Math.cos(continuousAngle) - star.z3d * Math.sin(continuousAngle);
        let z1 = star.x3d * Math.sin(continuousAngle) + star.z3d * Math.cos(continuousAngle);
        let y1 = star.y3d;

        // 2. Apply mouse tilt rotations
        // Rotate around X-axis (tilt up/down)
        let y2 = y1 * Math.cos(tiltX) - z1 * Math.sin(tiltX);
        let z2 = y1 * Math.sin(tiltX) + z1 * Math.cos(tiltX);

        // Rotate around Y-axis (tilt left/right)
        let x3 = x1 * Math.cos(tiltY) - z2 * Math.sin(tiltY);
        let z3 = x1 * Math.sin(tiltY) + z2 * Math.cos(tiltY);

        // 3. Apply Camera Zoom and Camera Pan offsets
        const cameraZ = 380 / zoom.current;
        const screenX = x3 + pan.currentX;
        const screenY = y2 + pan.currentY;
        const depth = z3 + perspective + cameraZ;

        // Clip stars behind camera view
        if (depth <= 10) return;

        // 3D to 2D projection
        const projectX = galaxyCenter.x + (screenX * perspective) / depth;
        const projectY = galaxyCenter.y + (screenY * perspective) / depth;
        
        // Star size maps to depth
        const projectedSize = (star.size * perspective) / depth * zoom.current;

        // Clip stars off screen bounds
        if (projectX < 0 || projectX > canvas.width || projectY < 0 || projectY > canvas.height) {
          return;
        }

        // Draw star particle
        ctx.beginPath();
        ctx.arc(projectX, projectY, Math.max(0.2, projectedSize), 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Mouse events
    const handleMouseMove = (e) => {
      // Coordinates relative to screen center
      mouse.current.targetX = e.clientX - window.innerWidth / 2;
      mouse.current.targetY = e.clientY - window.innerHeight / 2;
    };

    // Pan camera towards clicked point relative to center
    const handleCanvasClick = (e) => {
      const isButton = e.target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer");
      if (isButton) return;

      const clickX = e.clientX - galaxyCenter.x;
      const clickY = e.clientY - galaxyCenter.y;
      
      // Pan target offsets
      pan.targetX = -clickX * 0.7;
      pan.targetY = -clickY * 0.7;
      zoom.target = 1.7; // zoom in
    };

    // Reset pan & zoom
    const handleDoubleClick = () => {
      pan.targetX = 0;
      pan.targetY = 0;
      zoom.target = 1.0;
    };

    // Mouse wheel zoom triggers
    const handleWheel = (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * -0.0012;
      zoom.target = Math.max(0.5, Math.min(2.5, zoom.target + zoomDelta));
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("dblclick", handleDoubleClick);
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleCanvasClick);
      canvas.removeEventListener("dblclick", handleDoubleClick);
      canvas.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto -z-10 w-full h-full bg-[#03060c]"
    />
  );
}
