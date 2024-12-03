# **progetto_prova_finale**

### Prerequisiti
- **Backend**:
  - Python 3.12 o superiore
  - pip 24.0 o superiore
  - Django 5.0 o superiore
  - Django Rest Framework 3.15 o superiore
- **Frontend**:
  - Node.js 20.12 o superiore
  - npm 10.5 o superiore

#

## 1. Crea cartella 'progetto_prova_finale' dove riteni opportuno

## 2. Clona il repository nella cartella creata
    https://github.com/bianchiale040502/progetto_prova_finale.git

## 3. Aprire cartella 'progetto_prova_finale' in vscode
- N.B.: Durante l'uso del terminale, usare git bash

## 4. Creazione Backend
    1. Crea cartella 'backend' nel progetto e posizionati nella sua directory
        - C:/Users/bianc/ProgettiApp/progetto_prova_finale/backend

    1. Crea cartella 'backend'
    
    2. cd C:/Users/bianc/ProgettiApp/progetto_prova_finale/backend



    2. python -m venv .venv

    3. Attivazione virtual enviment
        - Linux/Mac: source venv/bin/activate 
        - Windows: source venv\Scripts\activate

    4. Verificare se pip è già installato
        - pip --version
    Se non è installato:
        - python -m ensurepip --default-pip

    5. Verificare se Django è già installato
        - pip freeze
    Se non è installato:
        - pip install Django

    6. pip freeze > requirements.txt
        N.B.: usare questo comando per aggiornare 'requirements.txt' se si installano altri pacchetti con pip.

    7. django-admin startproject backend

    8. Entrare nella directory del progetto appena creato
        - C:/Users/bianc/ProgettiApp/progetto_prova_finale/backend/backend

    8. cd C:/Users/bianc/ProgettiApp/progetto_prova_finale/backend/backend



    9. Prova server:
        - python manage.py runserver
        - Chiudere il server: CRTL+C
    
    10. python manage.py startapp implants

    11. python manage.py startapp migrate

    12. Inserire 'implants' in INSTALLED_APPS nel file settings.py

    13. Se model.py viene modificato:
        1. python manage.py startapp makemigrations
        2. python manage.py startapp migrate

    14. python manage.py createsuperuser

    15. python manage.py runserver

## 5. Creazione Frontend
    1. Iniziare da directory:
        - C:/Users/bianc/ProgettiApp/progetto_prova_finale

    1. - C:/Users/bianc/ProgettiApp/progetto_prova_finale



    2. Verificare se node.js è già installato
        - node -v
    Se non è installato:
        - https://nodejs.org/en/download/prebuilt-installer

    3. Verificae versione di npm:
        - npm -v
    Per aggiornare npm all'ultima versione:
        - npm install -g npm

    4. npm create vite@latest

    5. Project Name: frontend

    6. Select a framework: » React

    7. Select a variant: » JavaScript

    8. Posizionarsi nella directory:
        - C:/Users/bianc/ProgettiApp/progetto_prova_finale/frontend

    8. cd C:/Users/bianc/ProgettiApp/progetto_prova_finale/frontend

    

    9. npm install

    10. npm run dev

    11. Commenta o cancella contenuto index.css

    12. Pacchetti npm da installare
        - npm install @mui/icons-material @mui/material @emotion/styled @emotion/react