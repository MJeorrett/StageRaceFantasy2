using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StageRaceFantasy.Domain.Entities;

namespace StageRaceFantasy.Infrastructure.Persistence.EntityConfiguration
{
    public class RiderEntityConfiguration : IEntityTypeConfiguration<RiderEntity>
    {
        public void Configure(EntityTypeBuilder<RiderEntity> builder)
        {
            builder.Property(_ => _.FirstName)
                .HasColumnType("varchar(256)");

            builder.Property(_ => _.LastName)
                .HasColumnType("varchar(256)");

            builder
                .HasMany(_ => _.RaceEntries)
                .WithMany(_ => _.Riders)
                .UsingEntity<RiderFantasyRaceEntryEntity>(
                    j => j
                        .HasOne(_ => _.FantasyRace)
                        .WithMany(_ => _.RiderFantasyRaceEntries)
                        .OnDelete(DeleteBehavior.Cascade),
                    j => j
                        .HasOne(_ => _.Rider)
                        .WithMany(_ => _.RiderFantasyRaceEntries)
                        .OnDelete(DeleteBehavior.Cascade),
                    j => 
                        j.HasIndex(_ => new { _.RiderId, _.FantasyRaceId }));
        }
    }
}
