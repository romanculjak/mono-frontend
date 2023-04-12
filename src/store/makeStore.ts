import { makeAutoObservable } from "mobx";
import { Make, Model } from "../types/types";






class MakeStore {


    allMakes: Make[];

    constructor() {

        this.allMakes = [];

        makeAutoObservable(this);

    }

    initMakes(newMakes: Make[]) {
        this.allMakes = newMakes;
    }


}

const store = new MakeStore();
export default store