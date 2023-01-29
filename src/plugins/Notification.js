import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
const ErrorNotification = (text,type) => {
     return setTimeout(() => {
       createToast(text.text, {
              type: type.type,
              position: "top-right",
              showIcon: true,
              timeout: 2000,
            });
     }, );  
}
export default ErrorNotification

   