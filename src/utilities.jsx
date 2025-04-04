import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8080/",
});

export const Types = {
    'FOOD': "rgb(197, 77, 50)",
    'MISC': "rgb(38, 111, 160)",
    'CLOTHING': "rgb(139, 77, 163)",
    'SERVICE': "  #437a37",
    'BILL': "rgb(100, 47, 107)",
    'ENTERTAINMENT': "rgb(206, 158, 28)",
    'PRESENT': "rgb(101, 117, 58)",
    'CAR': "rgb(109, 98, 207)"
}