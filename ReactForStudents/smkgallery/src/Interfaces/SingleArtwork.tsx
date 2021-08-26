//the type for response
//https://api.smk.dk/api/v1/docs
//specifically /art/
export interface SingleArtwork {
    items: Item[];
  }
  
  export interface Item {
    id?: string;
    created?: Date;
    modified?: Date;
    acquisition_date_precision?: Date;
    current_location_date?: Date;
    dimensions?: Dimension[];
    inscriptions?: Inscription[];
    object_names?: ObjectName[];
    production?: Production[];
    production_date?: ProductionDate[];
    techniques?: string[];
    titles?: Title[];
    number_of_parts?: number;
    object_number?: string;
    object_url?: string;
    iiif_manifest?: string;
    enrichment_url?: string;
    similar_images_url?: string;
    production_dates_notes?: string[];
    public_domain?: boolean;
    rights?: string;
    on_display?: boolean;
    alternative_images?: AlternativeImage[];
    image_mime_type?: string;
    image_iiif_id?: string;
    image_iiif_info?: string;
    image_width?: number;
    image_height?: number;
    image_size?: number;
    image_thumbnail?: string;
    image_native?: string;
    image_cropped?: boolean;
    image_orientation?: string;
    has_image?: boolean;
    colors?: string[];
    artist?: string[];
    credit_line?: string[];
  }
  
  export interface AlternativeImage {
    mime_type?: string;
    iiif_id?: string;
    iiif_info?: string;
    width?: number;
    height?: number;
    size?: number;
    thumbnail?: string;
    native?: string;
    orientation?: string;
  }
  
  export interface Dimension {
    notes?: string;
    part?: string;
    type?: string;
    unit?: string;
    value?: string;
  }
  
  export interface Inscription {
    content?: string;
    description?: string;
    type?: string;
  }
  
  export interface ObjectName {
    name?: string;
  }
  
  export interface Production {
    creator?: string;
    creator_forename?: string;
    creator_surname?: string;
    creator_date_of_birth?: Date;
    creator_nationality?: string;
    creator_gender?: string;
    creator_history?: string;
    creator_lref?: string;
  }
  
  export interface ProductionDate {
    start?: Date;
    end?: Date;
    period?: string;
  }
  
  export interface Title {
    title?: string;
    type?: string;
  }
  