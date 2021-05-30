using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StageRaceFantasy.Domain.Entities;

namespace StageRaceFantasy.Infrastructure.Persistence.EntityConfiguration
{
    public class FantasyTeamEntityConfiguration : IEntityTypeConfiguration<FantasyTeamEntity>
    {
        public void Configure(EntityTypeBuilder<FantasyTeamEntity> builder)
        {
            builder.Property(_ => _.Name)
                .HasColumnType("varchar(256)");
        }
    }
}
