from django.urls import path
from .views import PortfolioDataView, ContactView

urlpatterns = [
    path('portfolio-data/', PortfolioDataView.as_view(), name='portfolio-data'),
    path('contact/', ContactView.as_view(), name='contact-submit'),
]
