using StageRaceFantasy.Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace StageRaceFantasy.Domain.Entities
{
    [Table("Race")]
    public class RaceEntity : IEntity
    {
        [Column("RaceId")]
        public int Id { get; set; }

        public string Name { get; set; } = "";

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int FantasyTeamSize { get; set; }

        public List<FantasyTeamEntity> FantasyTeams { get; set; } = new();

        public List<RiderRaceEntryEntity> RiderRaceEntries { get; set; } = new();
        public List<RiderEntity> Riders { get; set; } = new();
    }
}
