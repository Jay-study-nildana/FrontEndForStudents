//type from this
//https://api.smk.dk/api/v1/art/search/?keys=history&facets=has_image&offset=0&rows=100&lang=en&randomHighlights=xyz

export interface SearchResults {
  offset?: number;
  rows?: number;
  found?: number;
  items: Item[];
  facets?: Facets;
  facets_ranges?: FacetsRanges;
  corrections?: any[];
  autocomplete?: string[];
}

export interface Facets {
  has_image?: Array<number | string>;
}

export interface FacetsRanges {}

export interface Item {
  id?: string;
  created?: Date;
  modified?: Date;
  credit_line?: string[];
  current_location_date?: Date;
  dimensions?: Dimension[];
  object_names?: ObjectName[];
  part_of?: PartOf[];
  production_date?: ProductionDate[];
  techniques?: string[];
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
  has_image?: boolean;
  titles?: Title[];
  collection?: string[];
  inscriptions?: Inscription[];
  production?: Production[];
  work_status?: WorkStatus[];
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
  distinguishing_features?: string[];
  acquisition_date_precision?: Date;
  colors?: string[];
  artist?: string[];
  materials?: Material[];
  medium?: string[];
  parts?: string[];
  object_history_note?: string[];
  print_state?: string[];
  backside_protection?: boolean;
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
  part?: Part;
  type?: DimensionType;
  unit?: Unit;
  value?: string;
}

export enum Part {
  Billedmaal = "billedmaal",
  Bladmaal = "bladmaal",
  Brutto = "Brutto",
  Monteringsmaal = "monteringsmaal",
  Netto = "Netto",
  PartBrutto = "brutto",
}

export enum DimensionType {
  Depth = "depth",
  Height = "height",
  Width = "width",
}

export enum Unit {
  CM = "cm",
  Mm = "mm",
}

export interface Inscription {
  content?: string;
  language?: Language;
  type?: InscriptionType;
  description?: Description;
  position?: string;
}

export enum Description {
  RødBlyant = "rød blyant",
  RødtMonogramstempelPåKunstnerensEgenMontering = "rødt monogramstempel, på kunstnerens egen montering",
  Trykt = "Trykt",
}

export enum Language {
  American = "American",
  Danish = "Danish",
  English = "English",
  German = "German",
  Italian = "Italian",
}

export enum InscriptionType {
  Inscription = "Inscription",
  Signature = "signature",
  SignaturePrinted = "signature, printed",
}

export enum Material {
  Bronze = "bronze",
  Canvas = "canvas",
  JapanesePaper = "Japanese paper",
  Paper = "paper",
}

export interface ObjectName {
  name?: string;
}

export enum PartOf {
  Kks1986256 = "KKS1986-256",
  Kks200061 = "KKS2000-61",
  Kms7623 = "KMS7623",
  Kms8675 = "KMS8675",
}

export interface Production {
  creator?: string;
  creator_forename?: string;
  creator_surname?: string;
  creator_date_of_birth?: Date;
  creator_date_of_death?: Date;
  creator_nationality?: Language;
  creator_gender?: CreatorGender;
  creator_qualifier?: Creator;
  creator_role?: Creator;
  creator_lref?: string;
  creator_history?: string;
}

export enum CreatorGender {
  Male = "MALE",
}

export enum Creator {
  After = "after",
  AfterModelBy = "after model by",
  AttributedTo = "attributed to",
}

export interface ProductionDate {
  start?: Date;
  end?: Date;
  period?: string;
}

export interface Title {
  title?: string;
  type?: TitleType;
  notes?: string;
}

export enum TitleType {
  Artist = "ARTIST",
  Descript = "DESCRIPT",
  Oeuvre = "OEUVRE",
  Previous = "PREVIOUS",
}

export enum WorkStatus {
  Copy = "copy",
  PartOfAnArtwork = "part of an artwork",
  Series = "series",
  TrialProof = "trial proof",
}
