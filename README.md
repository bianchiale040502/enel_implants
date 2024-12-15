# **progetto_prova_finale**

## Descrizione
Progetto si un gestionale di impianti Enel con accesso alle modifiche tramite admin.

## Prerequisiti
- **Backend**:
  - Python 3.12 o superiore
  - pip 24.0 o superiore
  - Django 5.0 o superiore
  - Django Rest Framework 3.15 o superiore
- **Frontend**:
  - Node.js 20.12 o superiore
  - npm 10.5 o superiore

#

## 1. Creare cartella 'progetto_prova_finale' dove riteni opportuno

## 2. Clonare repository nella cartella creata
    https://github.com/bianchiale040502/progetto_prova_finale.git

## 3. Aprire cartella 'progetto_prova_finale' in vscode
- N.B.: Durante l'uso del terminale, usare git bash

## 4. Creazione Backend

### 4.1. Creare cartella 'backend' nel progetto
    C:/Users/bianc/ProgettiApp/progetto_prova_finale/backend

### 4.2. Posizionarsi nella directory creata
    cd C:/Users/bianc/ProgettiApp/progetto_prova_finale/backend

### 4.3. Creare virtual environment
    python -m venv .venv

### 4.4. Attivare virtual environment
- Linux/Mac:
```bash
source venv/bin/activate
```
- Windows:
```bash
source venv\Scripts\activate
```

### 4.5. Creare 'requirements.txt' e aggiungere i pacchetti pip utlizzati
    pip freeze > requirements.txt
- N.B.: usare questo comando per aggiornare 'requirements.txt' se si installano altri pacchetti nel progetto con pip.

### 4.6. Creare directory backend
    django-admin startproject backend

### 4.7. Entrare nella directory del progetto appena creato
    C:/Users/bianc/ProgettiApp/progetto_prova_finale/backend/backend

### 4.8. Provare accensione server:
    python manage.py runserver
- Per spgnere il server: CRTL+C
    
### 4.9. Creare app implants
    python manage.py startapp implants

### 4.10. Creare tabelle del database
    python manage.py startapp migrate

### 4.11. Inserire 'implants' in INSTALLED_APPS nel file settings.py

### 4.12. Se model.py viene modificato:
    1. python manage.py startapp makemigrations
    2. python manage.py startapp migrate

### 4.13. Creare utente
    python manage.py createsuperuser

### 4.14. Accendere server con porta 8080
    python manage.py runserver 8080

## 5. Creazione Frontend

### 5.1. Iniziare da directory:
    C:/Users/bianc/ProgettiApp/progetto_prova_finale

### 5.2. Creare struttura applicazione
    npm create vite@latest 

    Project Name: frontend

    Select a framework: » React

    Select a variant: » JavaScript

### 5.3. Posizionarsi nella directory:
    C:/Users/bianc/ProgettiApp/progetto_prova_finale/frontend

### 5.4. Installare dipendenze react e vite
    npm install

### 5.5. Avviare server developer
    npm run dev

### 5.6. Commenta o cancella contenuto index.css

### 5.7. Installare pacchetti npm
    npm install @mui/icons-material @mui/material @emotion/styled @emotion/react