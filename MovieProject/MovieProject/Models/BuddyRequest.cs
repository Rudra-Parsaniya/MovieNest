using System;

namespace MovieProject.Models
{
    public class BuddyRequest
    {
        public int BuddyRequestId { get; set; }
        public int FromUserId { get; set; }
        public int ToUserId { get; set; }
        public DateTime RequestedAt { get; set; } = DateTime.UtcNow;
        public bool IsAccepted { get; set; } = false;
    }
}
