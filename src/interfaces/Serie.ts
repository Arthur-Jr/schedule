export default interface Serie {
  show: {
    image: { medium: string, original: string },
    name: string,
    status: string,
    schedule: { time: string, days: string[] },
  }
};
