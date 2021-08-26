export interface Dimension {
    notes: string;
    part: string;
    type: string;
    unit: string;
    value: string;
  }
  
  export interface Inscription {
    content: string;
    type: string;
    description?: string;
  }
  
  export interface ObjectName {
    name: string;
  }
  
  export interface Production {
    creator_forename: string;
    creator_surname: string;
    creator_date_of_birth: string;
    creator_date_of_death?: string;
    creator_nationality: string;
    creator_gender: string;
    creator_history: string;
    creator_lref: string;
    creator?: string;
  }
  
  export interface ProductionDate {
    start: string;
    end: string;
    period: string;
  }
  
  export interface Title {
    title: string;
    type?: string;
  }
  
  export interface Item {
    id: string;
    created: string;
    modified: string;
    acquisition_date_precision: string;
    credit_line: string[];
    current_location_date: string;
    dimensions: Dimension[];
    inscriptions: Inscription[];
    materials?: string[];
    object_names: ObjectName[];
    production: Production[];
    production_date: ProductionDate[];
    techniques: string[];
    titles: Title[];
    medium?: string[];
    number_of_parts: number;
    object_number: string;
    object_url: string;
    iiif_manifest: string;
    enrichment_url: string;
    similar_images_url: string;
    production_dates_notes: string[];
    public_domain: boolean;
    rights: string;
    on_display: boolean;
    has_image: boolean;
    image_thumbnail: string;
    image_native: string;
    colors: string[];
    artist: string[];
    image_mime_type?: string;
    image_iiif_id?: string;
    image_iiif_info? : string;
    image_width? : number;
    image_height? : number;
    image_size? : number;
    image_cropped? : boolean;
    image_orientation?: string;
  }
  
  export interface ArtSingleObject {
    items: Item[];
  }