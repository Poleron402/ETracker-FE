import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8080/",
});

export const Types = {
    'FOOD': "rgb(197, 77, 50)",
    'MISC': "rgb(18, 179, 45)",
    'CLOTHING': "rgb(235, 11, 179)",
    'SERVICE': "rgb(0, 29, 190)",
    'BILL': "rgb(100, 47, 107)",
    'ENTERTAINMENT': "rgb(206, 158, 28)",
    'PRESENT': "rgb(13, 161, 124)",
    'CAR': "rgb(109, 98, 207)"
}