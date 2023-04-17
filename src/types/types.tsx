export interface DataRequest {
    year: number;
    years: string;
    measure: string;
    growth: number;
};
  
export interface stateListProps{
    children: React.ReactNode;
    dataRequest: DataRequest;
};

export enum Selected {
    year = "year",
    years = "years",
    measure = "measure",
    growth = "growth"
};

export type ApiResponse = {
    dataResponse: any;
    error: any;
    loading: Boolean;
};

export type CookState = {
    State: string;
    Household: number;
    PropertyValue: number;
    Population:number;
    growth100: number;

}

export type Growy = {
    State: any;
    growth100: number;
}

  