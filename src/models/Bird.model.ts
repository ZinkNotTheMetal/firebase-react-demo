export default interface Bird {
  id?: string
  species: string
  commonName: string
  sex?: 'Male' | 'Female'
  weight?: number
  sightingCount?: number
  // Picture...
}