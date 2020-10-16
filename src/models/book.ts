export class Book {
    id: number
    name: string
    shortDescription: string
    publishedDate: string
    authors: string
    availabilityStatus: boolean
    availableTo?: string 


constructor(id, name, shortDescription, publishedDate, authors, availabilityStatus, availableTo) {
    this.id = id;
    this.name = name;
    this.shortDescription = shortDescription;
    this.publishedDate = publishedDate;
    this.authors = authors;
    this.availabilityStatus = availabilityStatus;
    this.availableTo = availableTo
}

}