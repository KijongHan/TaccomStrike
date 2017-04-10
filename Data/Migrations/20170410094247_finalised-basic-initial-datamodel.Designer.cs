using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using AvaNet.Data;

namespace AvaNet.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20170410094247_finalised-basic-initial-datamodel")]
    partial class finalisedbasicinitialdatamodel
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AvaNet.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id");

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("AvatarImageURL");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("GameUserID")
                        .HasAnnotation("MaxLength", 25);

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedUserName")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("GameUserID")
                        .IsUnique();

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("AvaNet.Models.ApplicationUsersFriendship", b =>
                {
                    b.Property<int>("ApplicationUsersFriendshipID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ApplicationUserFriendId");

                    b.Property<string>("ApplicationUserId");

                    b.HasKey("ApplicationUsersFriendshipID");

                    b.HasIndex("ApplicationUserFriendId");

                    b.HasIndex("ApplicationUserId");

                    b.ToTable("ApplicationUsersFriendships");
                });

            modelBuilder.Entity("AvaNet.Models.ForumComment", b =>
                {
                    b.Property<int>("ForumCommentID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ApplicationUserId");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 1500);

                    b.Property<DateTime>("ForumCommentCreationTime");

                    b.Property<int?>("ForumThreadID");

                    b.Property<bool>("IsBanned");

                    b.Property<bool>("IsDeleted");

                    b.HasKey("ForumCommentID");

                    b.HasIndex("ApplicationUserId");

                    b.HasIndex("ForumThreadID");

                    b.ToTable("ForumComments");
                });

            modelBuilder.Entity("AvaNet.Models.ForumLike", b =>
                {
                    b.Property<int>("ForumLikeID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ApplicationUserId");

                    b.Property<int?>("ForumCommentID");

                    b.Property<int?>("ForumThreadID");

                    b.Property<int>("Weight");

                    b.HasKey("ForumLikeID");

                    b.HasIndex("ApplicationUserId");

                    b.HasIndex("ForumCommentID");

                    b.HasIndex("ForumThreadID");

                    b.ToTable("ForumLikes");
                });

            modelBuilder.Entity("AvaNet.Models.ForumThread", b =>
                {
                    b.Property<int>("ForumThreadID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ApplicationUserId");

                    b.Property<string>("ApplicationUserId1");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 1500);

                    b.Property<DateTime>("ForumThreadCreationTime");

                    b.Property<int>("ForumTopicID");

                    b.Property<int?>("ForumTopicID1");

                    b.Property<bool>("IsBanned");

                    b.Property<int?>("PinnedForumThreadsID");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 60);

                    b.HasKey("ForumThreadID");

                    b.HasIndex("ApplicationUserId");

                    b.HasIndex("ApplicationUserId1");

                    b.HasIndex("ForumTopicID");

                    b.HasIndex("ForumTopicID1");

                    b.HasIndex("PinnedForumThreadsID");

                    b.ToTable("ForumThreads");
                });

            modelBuilder.Entity("AvaNet.Models.ForumTopic", b =>
                {
                    b.Property<int>("ForumTopicID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Title");

                    b.HasKey("ForumTopicID");

                    b.ToTable("ForumTopics");
                });

            modelBuilder.Entity("AvaNet.Models.GameLore", b =>
                {
                    b.Property<int>("GameLoreID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content")
                        .IsRequired();

                    b.Property<string>("ImageURL")
                        .IsRequired();

                    b.Property<string>("Title")
                        .IsRequired();

                    b.HasKey("GameLoreID");

                    b.ToTable("GameLores");
                });

            modelBuilder.Entity("AvaNet.Models.GameUser", b =>
                {
                    b.Property<string>("GameUserID")
                        .HasAnnotation("MaxLength", 25);

                    b.HasKey("GameUserID");

                    b.ToTable("GameUsers");
                });

            modelBuilder.Entity("AvaNet.Models.PinnedForumThreads", b =>
                {
                    b.Property<int>("PinnedForumThreadsID")
                        .ValueGeneratedOnAdd();

                    b.HasKey("PinnedForumThreadsID");

                    b.ToTable("PinnedForumThreads");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("AvaNet.Models.ApplicationUser", b =>
                {
                    b.HasOne("AvaNet.Models.GameUser", "GameUser")
                        .WithOne("ApplicationUser")
                        .HasForeignKey("AvaNet.Models.ApplicationUser", "GameUserID");
                });

            modelBuilder.Entity("AvaNet.Models.ApplicationUsersFriendship", b =>
                {
                    b.HasOne("AvaNet.Models.ApplicationUser", "ApplicationUserFriend")
                        .WithMany()
                        .HasForeignKey("ApplicationUserFriendId");

                    b.HasOne("AvaNet.Models.ApplicationUser", "ApplicationUser")
                        .WithMany()
                        .HasForeignKey("ApplicationUserId");
                });

            modelBuilder.Entity("AvaNet.Models.ForumComment", b =>
                {
                    b.HasOne("AvaNet.Models.ApplicationUser", "ApplicationUser")
                        .WithMany("ForumComments")
                        .HasForeignKey("ApplicationUserId");

                    b.HasOne("AvaNet.Models.ForumThread")
                        .WithMany("ForumComments")
                        .HasForeignKey("ForumThreadID");
                });

            modelBuilder.Entity("AvaNet.Models.ForumLike", b =>
                {
                    b.HasOne("AvaNet.Models.ApplicationUser", "ApplicationUser")
                        .WithMany()
                        .HasForeignKey("ApplicationUserId");

                    b.HasOne("AvaNet.Models.ForumComment")
                        .WithMany("ForumLikes")
                        .HasForeignKey("ForumCommentID");

                    b.HasOne("AvaNet.Models.ForumThread")
                        .WithMany("ForumLikes")
                        .HasForeignKey("ForumThreadID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AvaNet.Models.ForumThread", b =>
                {
                    b.HasOne("AvaNet.Models.ApplicationUser", "ApplicationUser")
                        .WithMany()
                        .HasForeignKey("ApplicationUserId");

                    b.HasOne("AvaNet.Models.ApplicationUser")
                        .WithMany("ForumThreads")
                        .HasForeignKey("ApplicationUserId1");

                    b.HasOne("AvaNet.Models.ForumTopic")
                        .WithMany("ForumThreads")
                        .HasForeignKey("ForumTopicID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AvaNet.Models.ForumTopic", "ForumTopic")
                        .WithMany()
                        .HasForeignKey("ForumTopicID1");

                    b.HasOne("AvaNet.Models.PinnedForumThreads")
                        .WithMany("ForumThreads")
                        .HasForeignKey("PinnedForumThreadsID");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Claims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("AvaNet.Models.ApplicationUser")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("AvaNet.Models.ApplicationUser")
                        .WithMany("Logins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AvaNet.Models.ApplicationUser")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
