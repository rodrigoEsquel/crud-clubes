class Team {
  constructor(team) {
    const name = team.area;
    this.area = { name };
    this.name = team.name;
    this.tla = team.tla;
    this.website = team.website;
    this.email = team.email;
    this.id = team.id;
    this.crestUrl = team.crestUrl;
  }
}

export default Team;
