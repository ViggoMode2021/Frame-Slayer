function getIPFromSubnet(subnetRange) {

  // subnetRange = "10.0.0.0/24"
  const subnet = subnetRange.split('/')[0]; // 10.0.0.0
  const mask = subnetRange.split('/')[1]; // 24
  const ipArray = subnet.split('.'); //["10", "0", "0", "0"]


  var ipInBinary = ""; // will contain the binary equivalent of the iP

  // for each element in the array, convert from decimal to binary
  for (let quad of ipArray) {
    let octet = parseInt(quad, 10).toString(2)

    // we need each octet to be 8 bits. So provide padding for those which are less than 8 bits
    // 0101 becomes 00000101
    let octetLength = octet.length
    if (octetLength < 8) {
      let octDiff = 8 - octetLength;
      octet = "0".repeat(octDiff) + octet
    }

    // concat all the octets into a 32 bit binary
    ipInBinary = ipInBinary.concat(octet) // 00001010000000000000000000000000

  }
  // console.log("ipInBinary: ", ipInBinary);

  // strip the subnet from the entire address:
  let subnetBinary = ipInBinary.slice(0, mask) // 000010100000000000000000
  let hostsBinary = ipInBinary.slice(mask, ipInBinary.length) // 00000000


  var randomBinarySubstitute = "";
  const randomPool = "10101010101010101010101010101010" //fix this nonsense later.

  for (let i = 0; i < 32 - mask; i++) {
    randomBinarySubstitute += randomPool[Math.floor(Math.random() * ipInBinary.length)]
  }


  let newIPBinary = subnetBinary + randomBinarySubstitute;

  let finalIP = "";

  // split the 32 bit binary IP into an array of 8 bits, each representing an octate
  let finalIPArray_binary = newIPBinary.match(/.{8}/g) //  ["00001010", "00000000", "00000000", "10001010"]

  // convert the binary quad array to decimal dotted quad
  for (let element of finalIPArray_binary) {
    finalIP = finalIP + "." + parseInt(element, 2);
    finalIP = finalIP.replace(/^\./, ""); // remnove the leading .
  }
  console.log("FinalIP", finalIP)
  return finalIP
}

getIPFromSubnet('10.0.0.0/16')
