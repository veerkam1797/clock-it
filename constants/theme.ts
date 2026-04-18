import { Colors } from "./colors";

export const theme = {
  light: {
    background: Colors.base.white,
    primary: Colors.purple[600],
    success: Colors.success[600],
    error: Colors.error[500],
    warning: Colors.warning[500],
    button: Colors.purple[500],
    labels: Colors.grey[500],
    subtext: Colors.grey[600],
    body: Colors.grey[800],
    headings: Colors.grey[900],
    border: Colors.grey[100],
    divider: Colors.grey[200]

  },
  dark: {
    background: Colors.base.black,
    primary: Colors.purple[600],
    success: Colors.success[500],
    error: Colors.error[500],
    warning: Colors.warning[500],
    button: Colors.purple[500],
    labels: Colors.grey[200],
    subtext: Colors.grey[300],
    body: Colors.grey[50],
    headings: Colors.grey[25],
    border: Colors.grey[100],
    divider: Colors.grey[200]
  }
}