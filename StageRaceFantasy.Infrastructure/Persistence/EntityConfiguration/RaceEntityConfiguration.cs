using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StageRaceFantasy.Domain.Entities;

namespace StageRaceFantasy.Infrastructure.Persistence.EntityConfiguration
{
    class RaceEntityConfiguration : IEntityTypeConfiguration<RaceEntity>
    {
        public void Configure(EntityTypeBuilder<RaceEntity> builder)
        {
            builder.Property(_ => _.Name)
                .HasColumnType("varchar(256)");

            builder
                .HasMany(_ => _.FantasyTeams)
                .WithOne(_ => _.Race)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
