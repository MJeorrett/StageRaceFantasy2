using StageRaceFantasy.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace StageRaceFantasy.Domain.Entities
{
    [Table("RiderFantasyRaceEntry")]
    public class RiderFantasyRaceEntryEntity : IEntity
    {
        [Column("RiderFantasyRaceEntryId")]
        public int Id { get; set; }

        public int RiderId { get; set; }
        public RiderEntity Rider { get; set; } = null!;
        
        public int FantasyRaceId { get; set; }
        public FantasyRaceEntity FantasyRace { get; set; } = null!;
    }
}
