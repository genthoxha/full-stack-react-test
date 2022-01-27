export class Utils {
  static calculateDistance = (latitude1, longitude1, latitude2, longitude2) => {
    const R = 6371;
    const dLat = this.toRad(latitude2 - latitude1);
    const dLon = this.toRad(longitude2 - longitude1);
    const lat1 = this.toRad(latitude1);
    const lat2 = this.toRad(latitude2);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  static toRad = (Value) => {
    return (Value * Math.PI) / 180;
  };
}
