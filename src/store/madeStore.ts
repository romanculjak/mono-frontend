import { makeAutoObservable } from "mobx";
import { Model } from "../types/types";




class MadeStore {


    allMades: Model[];

    constructor() {

        this.allMades = [];

        makeAutoObservable(this);

    }

    initMades(newMades: Model[]) {
        this.allMades = newMades;
    }


}


const store = new MadeStore();
export default store