using System;
using System.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace library.data.Model
{
    public partial class TaccomStrikeContext : DbContext
    {
        public virtual DbSet<ForumComment> ForumComment { get; set; }
        public virtual DbSet<ForumLike> ForumLike { get; set; }
        public virtual DbSet<ForumThread> ForumThread { get; set; }
        public virtual DbSet<ForumTopic> ForumTopic { get; set; }
        public virtual DbSet<TaccomStrikeUser> TaccomStrikeUser { get; set; }

        public TaccomStrikeContext(DbContextOptions<TaccomStrikeContext> options)
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
            modelBuilder.Entity<ForumComment>(entity =>
            {
                entity.ToTable("ForumComment", "forum");

                entity.Property(e => e.ForumCommentId).HasColumnName("ForumCommentID");

                entity.Property(e => e.CommentContent).HasMaxLength(1000);

                entity.Property(e => e.ForumThreadId).HasColumnName("ForumThreadID");

                entity.Property(e => e.TaccomStrikeUserId).HasColumnName("TaccomStrikeUserID");

                entity.Property(e => e.WhenCreated).HasColumnType("datetime");

                entity.Property(e => e.WhenDeleted).HasColumnType("datetime");

                entity.HasOne(d => d.ForumThread)
                    .WithMany(p => p.ForumComment)
                    .HasForeignKey(d => d.ForumThreadId)
                    .HasConstraintName("FK_ForumComment_ForumThread");

                entity.HasOne(d => d.TaccomStrikeUser)
                    .WithMany(p => p.ForumComment)
                    .HasForeignKey(d => d.TaccomStrikeUserId)
                    .HasConstraintName("FK_ForumComment_TaccomStrikeUser");
            });

            modelBuilder.Entity<ForumLike>(entity =>
            {
                entity.ToTable("ForumLike", "forum");

                entity.Property(e => e.ForumlikeId).HasColumnName("ForumlikeID");

                entity.Property(e => e.ForumCommentId).HasColumnName("ForumCommentID");

                entity.Property(e => e.ForumThreadId).HasColumnName("ForumThreadID");

                entity.Property(e => e.TaccomStrikeUserId).HasColumnName("TaccomStrikeUserID");

                entity.Property(e => e.WhenCreated).HasColumnType("datetime");

                entity.Property(e => e.WhenDeleted).HasColumnType("datetime");

                entity.HasOne(d => d.ForumComment)
                    .WithMany(p => p.ForumLike)
                    .HasForeignKey(d => d.ForumCommentId)
                    .HasConstraintName("FK_ForumLike_ForumComment");

                entity.HasOne(d => d.ForumThread)
                    .WithMany(p => p.ForumLike)
                    .HasForeignKey(d => d.ForumThreadId)
                    .HasConstraintName("FK_ForumLike_ForumThread");

                entity.HasOne(d => d.TaccomStrikeUser)
                    .WithMany(p => p.ForumLike)
                    .HasForeignKey(d => d.TaccomStrikeUserId)
                    .HasConstraintName("FK_ForumLike_TaccomStrikeUser");
            });

            modelBuilder.Entity<ForumThread>(entity =>
            {
                entity.ToTable("ForumThread", "forum");

                entity.Property(e => e.ForumThreadId).HasColumnName("ForumThreadID");

                entity.Property(e => e.Content).HasMaxLength(2000);

                entity.Property(e => e.ForumTopicId).HasColumnName("ForumTopicID");

                entity.Property(e => e.TaccomStrikeUserId).HasColumnName("TaccomStrikeUserID");

                entity.Property(e => e.Title).HasMaxLength(500);

                entity.Property(e => e.WhenCreated).HasColumnType("datetime");

                entity.Property(e => e.WhenDeleted).HasColumnType("datetime");

                entity.HasOne(d => d.ForumTopic)
                    .WithMany(p => p.ForumThread)
                    .HasForeignKey(d => d.ForumTopicId)
                    .HasConstraintName("FK_ForumThread_ForumTopic");

                entity.HasOne(d => d.TaccomStrikeUser)
                    .WithMany(p => p.ForumThread)
                    .HasForeignKey(d => d.TaccomStrikeUserId)
                    .HasConstraintName("FK_ForumThread_TaccomStrikeUser");
            });

            modelBuilder.Entity<ForumTopic>(entity =>
            {
                entity.ToTable("ForumTopic", "forum");

                entity.Property(e => e.ForumTopicId).HasColumnName("ForumTopicID");

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.Title).HasMaxLength(200);

                entity.Property(e => e.WhenCreated).HasColumnType("datetime");

                entity.Property(e => e.WhenDeleted).HasColumnType("datetime");
            });

            modelBuilder.Entity<TaccomStrikeUser>(entity =>
            {
                entity.Property(e => e.TaccomStrikeUserId).HasColumnName("TaccomStrikeUserID");

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.PasswordSalt)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.WhenCreated).HasColumnType("datetime");

                entity.Property(e => e.WhenDeleted).HasColumnType("datetime");
            });
        }
    }
}
