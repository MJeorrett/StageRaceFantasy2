using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StageRaceFantasy.Domain.Entities;

namespace StageRaceFantasy.Infrastructure.Persistence.EntityConfiguration
{
    public class FantasyRaceTeamEntityConfiguration : IEntityTypeConfiguration<FantasyRaceTeamEntity>
    {
        public void Configure(EntityTypeBuilder<FantasyRaceTeamEntity> builder)
        {
            builder.Property(_ => _.Name)
                .HasColumnType("varchar(100)");
        }
    }
}
