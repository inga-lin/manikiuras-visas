import { GET_DATA_FROM_SERVER} from "../Constants";
// cia gaunam duomenis is serverio 102
export function getDataFromServer(serverData) {
    return {
        type: GET_DATA_FROM_SERVER,
        payload: serverData //tai ka gausim is serverio. todel cia reik payload o kitiems jo nereiks nes jie tik jau turima info rusiuos
    }
}

