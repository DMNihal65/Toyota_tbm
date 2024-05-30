export function getTitle(pathname) {
  switch (pathname) {
    case "/":
      return "Home";
    case "/pendingTasks":
      return "Pending Tasks"; 
    case "/checkList":
      return "Card Details";
    case "/allMachine/cardDetails/":
      return "Card Details";
    case "/allMachine":
      return "All Cards";
    case "/pendingTasks/cardDetails/":
      return "Pending Card Details";
    default:
      return "";
  }
}

export function getSection(pathname) {
  switch (pathname) {
    case "P":
      return "TBM";
    case "S":
      return "Smile Card";
    default:
      return "NULL";
  }
}
