using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StageRaceFantasy.Domain.Entities;

namespace StageRaceFantasy.Infrastructure.Persistence.EntityConfiguration
{
    class FantasyRaceEntityConfiguration : IEntityTypeConfiguration<FantasyRaceEntity>
    {
        public void Configure(EntityTypeBuilder<FantasyRaceEntity> builder)
        {
            builder
                .HasMany(_ => _.FantasyTeams)
                .WithOne(_ => _.FantasyRace)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(_ => _.Name)
                .HasColumnType("varchar(100)");
        }
    }
}
