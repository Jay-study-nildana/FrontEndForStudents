import React, { useState } from 'react';
import './ProfilePage.css';

export type ProfileContact = {
  label: string;
  value: string;
  href?: string;
};

export type ProfileActivityItem = {
  id: string;
  type: 'post' | 'comment' | 'like';
  title: string;
  timeAgo: string;
  excerpt?: string;
};

export type ProfileData = {
  id: string;
  name: string;
  handle?: string;
  avatarUrl?: string;
  coverUrl?: string;
  location?: string;
  bio?: string;
  role?: string;
  stats?: { followers?: number; following?: number; posts?: number };
  contacts?: ProfileContact[];
  gallery?: string[]; // image urls
  activity?: ProfileActivityItem[];
};

export type ProfilePageProps = {
  profile: ProfileData;
  onFollow?: (profileId: string) => void;
  initialFollowing?: boolean;
  className?: string;
};

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  onFollow,
  initialFollowing = false,
  className = ''
}) => {
  const [following, setFollowing] = useState(initialFollowing);
  const [activeTab, setActiveTab] = useState<'about' | 'gallery' | 'activity' | 'contacts'>('about');

  const handleFollow = () => {
    const next = !following;
    setFollowing(next);
    if (onFollow) onFollow(profile.id);
  };

  const shortNumber = (n?: number) =>
    n == null ? '-' : n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${Math.round(n / 1000)}k` : String(n);

  return (
    <div className={`profile-root ${className}`} role="region" aria-label={`${profile.name} profile`}>
      <div
        className="profile-cover"
        style={{ backgroundImage: profile.coverUrl ? `url(${profile.coverUrl})` : undefined }}
        aria-hidden={true}
      />
      <div className="profile-card">
        <header className="profile-header">
          <div className="profile-avatar-wrap">
            <img className="profile-avatar" src={profile.avatarUrl} alt={`${profile.name} avatar`} />
          </div>

          <div className="profile-meta">
            <div className="profile-title">
              <div>
                <h1 className="profile-name">{profile.name}</h1>
                {profile.handle && <div className="profile-handle">@{profile.handle}</div>}
                {profile.role && <div className="profile-role">{profile.role}</div>}
              </div>

              <div className="profile-actions">
                <button className={`btn btn-follow ${following ? 'following' : ''}`} onClick={handleFollow}>
                  {following ? 'Following' : 'Follow'}
                </button>
                <button className="btn btn-message" title="Send message">Message</button>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat">
                <div className="stat-val">{shortNumber(profile.stats?.followers)}</div>
                <div className="stat-label">Followers</div>
              </div>
              <div className="stat">
                <div className="stat-val">{shortNumber(profile.stats?.following)}</div>
                <div className="stat-label">Following</div>
              </div>
              <div className="stat">
                <div className="stat-val">{shortNumber(profile.stats?.posts)}</div>
                <div className="stat-label">Posts</div>
              </div>
            </div>
          </div>
        </header>

        <main className="profile-body">
          <nav className="profile-tabs" role="tablist" aria-label="Profile sections">
            <button
              role="tab"
              aria-selected={activeTab === 'about'}
              className={activeTab === 'about' ? 'active' : ''}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'gallery'}
              className={activeTab === 'gallery' ? 'active' : ''}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'activity'}
              className={activeTab === 'activity' ? 'active' : ''}
              onClick={() => setActiveTab('activity')}
            >
              Activity
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'contacts'}
              className={activeTab === 'contacts' ? 'active' : ''}
              onClick={() => setActiveTab('contacts')}
            >
              Contacts
            </button>
          </nav>

          <section className="profile-section" hidden={activeTab !== 'about'} aria-hidden={activeTab !== 'about'}>
            {profile.bio && <p className="profile-bio">{profile.bio}</p>}
            <div className="profile-details">
              {profile.location && (
                <div className="detail">
                  <div className="detail-label">Location</div>
                  <div className="detail-value">{profile.location}</div>
                </div>
              )}
              {profile.contacts?.length ? (
                <div className="detail">
                  <div className="detail-label">Primary Contact</div>
                  <div className="detail-value">{profile.contacts[0].value}</div>
                </div>
              ) : null}
            </div>
          </section>

          <section className="profile-section gallery" hidden={activeTab !== 'gallery'} aria-hidden={activeTab !== 'gallery'}>
            {profile.gallery && profile.gallery.length ? (
              <div className="gallery-grid">
                {profile.gallery.map((src, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className="gallery-item" key={`${profile.id}-g-${i}`}>
                    <img src={src} alt={`Gallery image ${i + 1}`} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="placeholder">No gallery images</div>
            )}
          </section>

          <section className="profile-section activity" hidden={activeTab !== 'activity'} aria-hidden={activeTab !== 'activity'}>
            {profile.activity && profile.activity.length ? (
              <ul className="activity-list">
                {profile.activity.map((a) => (
                  <li key={a.id} className="activity-item">
                    <div className="activity-head">
                      <div className="activity-type">{a.type.toUpperCase()}</div>
                      <div className="activity-time">{a.timeAgo}</div>
                    </div>
                    <div className="activity-body">
                      <div className="activity-title">{a.title}</div>
                      {a.excerpt && <div className="activity-excerpt">{a.excerpt}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="placeholder">No recent activity</div>
            )}
          </section>

          <section className="profile-section contacts" hidden={activeTab !== 'contacts'} aria-hidden={activeTab !== 'contacts'}>
            {profile.contacts && profile.contacts.length ? (
              <ul className="contacts-list">
                {profile.contacts.map((c, i) => (
                  <li key={`${profile.id}-c-${i}`} className="contact-item">
                    <div className="contact-label">{c.label}</div>
                    <div className="contact-value">
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noopener noreferrer">
                          {c.value}
                        </a>
                      ) : (
                        c.value
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="placeholder">No contacts available</div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

ProfilePage.displayName = 'ProfilePage';