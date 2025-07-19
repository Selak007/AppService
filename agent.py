name: Build and deploy Flask app to Azure Web App - flaskapp19

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Prepare deployment package
        run: |
          mkdir deploy
          cp agent.py requirements.txt deploy/
          cd deploy
          zip -r ../release.zip .

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: python-app
          path: release.zip

  deploy:
    runs-on: ubuntu-latest
    needs: build
    permissions:
      id-token: write
      contents: read

    steps:
      - name: Download artifact
        uses: actions/download-artifact@v4
        with:
          name: python-app

      - name: Unzip artifact
        run: unzip release.zip

      - name: Login to Azure
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZUREAPPSERVICE_CLIENTID_0974A7B408404E03BA3399A7A07D607B }}
          tenant-id: ${{ secrets.AZUREAPPSERVICE_TENANTID_472C4F0991AD4A41A58ADA4E3EEA4DEA }}
          subscription-id: ${{ secrets.AZUREAPPSERVICE_SUBSCRIPTIONID_893518D29F3A4E0DBBB55670DE5DD24E }}

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v3
        with:
          app-name: 'flaskapp19'
          slot-name: 'Production'
          package: release.zip
