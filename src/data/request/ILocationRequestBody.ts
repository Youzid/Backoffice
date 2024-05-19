export interface ILocationRequestBody {
  categoryId: string,
  nameAr: string,
  nameFr: string,
  nameEn: string,
  descriptionAr?:string
  descriptionFr?:string
  descriptionEn?:string
  latitude: string,
  longitude: string,
  address: string,
  addressAr: string
}
