export class Property {
    property_id: string;
    name: string;
    image: string;
    tagline: string;

    constructor(property_id: string, name: string, image: string, tagline: string) {
        this.property_id = property_id;
        this.name = name;
        this.image = image;
        this.tagline = tagline;
    }
}