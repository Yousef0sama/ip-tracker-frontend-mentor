
export const checkIP = (ip, ipV, isIP) => {

  if (ip === "") {
    alert("please input your IP");
    return false;
  }

  if (!isIP(ip)) {
    alert("your IP is invaild");
    return false;
  }

  if (ipV(ip) === 6) {
    alert("only IPv4 is accepted");
    return false;
  }

  return true;

}