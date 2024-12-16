# **enel implants**

## Descrizione
Progetto di un gestionale di impianti Enel con accesso alle modifiche tramite admin.

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

## 1. Clonare repository in una cartella progetti
    https://github.com/bianchiale040502/progetto_prova_finale.git

## 2. Aprire cartella 'progetto_prova_finale' in vscode
- N.B.: Usare git bash

## 3. Creazione Backend

### 3.1. Creare cartella 'backend' nel progetto
    C:/Users/bianc/ProgettiApp/progetto_prova_finale/backend

### 3.2. Posizionarsi nella directory creata
    cd C:/Users/bianc/ProgettiApp/progetto_prova_finale/backend

### 3.3. Creare virtual environment
    python -m venv .venv

### 3.4. Attivare virtual environment
- Linux/Mac:
```bash
source venv/bin/activate
```
- Windows:
```bash
source venv\Scripts\activate
```

### 3.5. Creare 'requirements.txt' e aggiungere i pacchetti pip utlizzati
    pip freeze > requirements.txt
- N.B.: usare questo comando per aggiornare 'requirements.txt' se si installano altri pacchetti nel progetto con pip.

### 3.6. Creare directory backend
    django-admin startproject backend

### 3.7. Entrare nella directory del progetto appena creato
    C:/Users/bianc/ProgettiApp/progetto_prova_finale/backend/backend

### 3.8. Provare accensione server:
    python manage.py runserver
    
### 3.9. Creare app implants
    python manage.py startapp implants

### 3.10. Creare tabelle del database
    python manage.py startapp migrate

### 3.11. Inserire 'implants' in INSTALLED_APPS nel file settings.py

### 3.12. Se model.py viene modificato:
    1. python manage.py startapp makemigrations
    2. python manage.py startapp migrate

### 3.13. Creare utente
    python manage.py createsuperuser

### 3.14. Accendere server con porta 8080
    python manage.py runserver 8080

### 3.15 Creare gruppo "Admins" in Groups (no permessi)

### 3.16 Creare admin/admins di prova in Users e inserirlo/inserirli nel gruppo "Admins"

## 4. Creazione Frontend

### 4.1. Iniziare da directory:
    C:/Users/bianc/ProgettiApp/progetto_prova_finale

### 4.2. Creare struttura applicazione
    npm create vite@latest 

    Project Name: frontend

    Select a framework: » React

    Select a variant: » JavaScript

### 4.3. Posizionarsi nella directory:
    C:/Users/bianc/ProgettiApp/progetto_prova_finale/frontend

### 4.4. Installare dipendenze react e vite
    npm install

### 4.5. Avviare server developer
    npm run dev

### 4.6. Commenta o cancella contenuto index.css

### 4.7. Installare pacchetti npm
    npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

## Da aggiungere:
- tabella flex;
- logica snackbar consecutivi;
- loding screen tra utente e admin;
- loding per modifiche impianto;
- semplicazione e pulizia codice;