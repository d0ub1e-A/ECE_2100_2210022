import os from 'node:os';

export function getIPAddresses() {
  const interfaces = os.networkInterfaces(); // It is an object containing multiple keys named on interface type whose values are an array with info of those interfaces
  const ipAddress = {
    wifi: [],
    ethernet: [],
  };

  const getAddress = interfaceArray => 
    interfaceArray.filter(interfaceInfo => interfaceInfo.family === 'IPv4').map(interfaceInfo => interfaceInfo.address);

  for(const interfaceKey in interfaces) {
    const networkInterfaceArray = interfaces[interfaceKey];
    const interfaceName = interfaceKey.toLowerCase();
    
    if(interfaceName.includes(`ethernet`) || interfaceName.includes(`lan`)) 
      ipAddress.ethernet = getAddress(networkInterfaceArray);
    else if(interfaceName.includes(`wi-fi`) || interfaceName.includes(`wlan`) || interfaceName.includes(`wireless`)) 
      ipAddress.wifi = getAddress(networkInterfaceArray);
  }
  return ipAddress;
}