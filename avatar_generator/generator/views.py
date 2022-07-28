from django.http import HttpRequest, HttpResponse
from django.shortcuts import render


def index(request: HttpRequest):
    v = render(request, 'generator/404.html', status=404)
    return render(request, 'generator/index.html')


def handler404(request: HttpRequest, exception):
    return render(request, 'generator/404.html', status=404)
