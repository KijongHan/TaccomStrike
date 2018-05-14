using System;
using System.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TaccomStrike.Library.Data.Model
{
    public partial class CacheDbContext : DbContext
    {   
        public virtual DbSet<Session> Session {get;set;}

        public CacheDbContext(DbContextOptions<CacheDbContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
