# VirtEarth frontend

## Overview
This repository contains the vue.js frontend for the VirtEarth POC

* **Backend repository**: [VirtEarth backend](https://github.com/Alexander-Engelrelst/virtearth-backend)
* **Live Demo**: [Watch a demo of the game](https://youtu.be/sPvokRURzJg)

## Credits
I only aided in integrating the backend and fixing some bugs. This project was merely added to complete the provided backend repository.

### Team
* **Alexander Engelrelst**
* **Kobe Vandenberghe**
* **Rune Mortier**
* **Sebastien George**

## Usage
Before starting this docker and the related backend as linked above must be running.

```bash
docker build -t virt-earth-client .
docker run -d -p 8080:80 --name virt-earth-container virt-earth-client
```

After doing this the client will be accessible at [http://localhost:8080](http://localhost:8080)
