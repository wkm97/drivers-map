export interface Driver {
    driver_id: string
    location: {
        latitude: number
        longitude: number
        bearing: number
    }
    routes: Array<{
        duration: number
        geometry: {
            coordinates: Array<[number, number]>
            type: "LineString"
        }
    }>
}

export interface Drivers {
    pickup_eta: number
    drivers: Driver[]
}