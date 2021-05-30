using StageRaceFantasy.Domain.Common;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace StageRaceFantasy.Domain.Entities
{
    [Table("Rider")]
    public class RiderEntity : IEntity
    {
        [Column("RiderId")]
        public int Id { get; set; }

        public string FirstName { get; set; } = "";

        public string LastName { get; set; } = "";

        public List<RiderFantasyRaceEntryEntity> RiderFantasyRaceEntries { get; set; } = new();
        public List<FantasyRaceEntity> RaceEntries { get; set; } = new();
    }
}
