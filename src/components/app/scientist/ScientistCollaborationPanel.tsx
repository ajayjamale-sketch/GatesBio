import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import VideocamIcon from '@mui/icons-material/Videocam';
import type { CollaborationMessage, DashboardSession } from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';

interface ScientistCollaborationPanelProps {
  session: DashboardSession;
  messages: CollaborationMessage[];
  onPostMessage: (msg: CollaborationMessage) => void;
  onAddReply: (messageId: string, text: string) => void;
  onToggleReaction: (messageId: string, emoji: string) => void;
  onNotify: (msg: string) => void;
}

const CHANNELS: CollaborationMessage['channel'][] = [
  '#kras-crispr-screen',
  '#scrna-tumor-atlas',
  '#cross-lab-handoffs',
];

export const ScientistCollaborationPanel: React.FC<ScientistCollaborationPanelProps> = ({
  session,
  messages,
  onPostMessage,
  onAddReply,
  onToggleReaction,
  onNotify,
}) => {
  const [activeChannel, setActiveChannel] = useState<CollaborationMessage['channel']>('#kras-crispr-screen');
  const [newMessage, setNewMessage] = useState('');
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [huddleOpen, setHuddleOpen] = useState(false);

  const channelMessages = messages.filter((m) => m.channel === activeChannel);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onPostMessage({
      id: `MSG-${Date.now()}`,
      channel: activeChannel,
      author: session.userName,
      role: session.roleTitle,
      time: 'Just now',
      text: newMessage.trim(),
      reactions: [{ emoji: '🧬', count: 1 }],
      replies: [],
    });
    setNewMessage('');
  };

  const handleSendReply = (e: React.FormEvent, messageId: string) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onAddReply(messageId, replyText.trim());
    setReplyText('');
    setReplyTargetId(null);
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}
    >
      <DashboardSectionHeader
        title="Team Workspace & Peer Discussion"
        subtitle="Project channels, threaded scientific reviews, and WebRTC data-plot huddles"
        moduleRef="2.8"
        actionLabel="Start Lab Huddle"
        actionIcon={<VideocamIcon fontSize="small" />}
        onAction={() => setHuddleOpen(true)}
      />

      <Tabs
        value={activeChannel}
        onChange={(_, v) => setActiveChannel(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2, minHeight: 34, '& .MuiTab-root': { minHeight: 34, fontSize: '12px', fontWeight: 700, textTransform: 'none' } }}
      >
        {CHANNELS.map((ch) => (
          <Tab key={ch} value={ch} label={ch} />
        ))}
      </Tabs>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 2 }}>
        {channelMessages.map((m) => (
          <Box key={m.id} sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A' }}>
                {m.author} <span style={{ color: '#64748B', fontWeight: 500 }}>· {m.role} · {m.time}</span>
              </Typography>
              {m.attachmentBadge && (
                <Chip
                  size="small"
                  label={m.attachmentBadge}
                  sx={{ height: 20, bgcolor: '#EFF6FF', color: '#1E40AF', border: '1px solid #DBEAFE', fontSize: '10px', fontWeight: 700, borderRadius: '4px' }}
                />
              )}
            </Box>
            <Typography variant="body2" sx={{ color: '#334155', fontSize: '13px', mt: 0.5 }}>
              {m.text}
            </Typography>

            {/* Reactions & Reply Trigger */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 1, flexWrap: 'wrap' }}>
              {m.reactions.map((r) => (
                <Chip
                  key={r.emoji}
                  size="small"
                  label={`${r.emoji} ${r.count}`}
                  onClick={() => onToggleReaction(m.id, r.emoji)}
                  sx={{ height: 22, cursor: 'pointer', bgcolor: '#FFFFFF', border: '1px solid #CBD5E1', fontSize: '11px', borderRadius: '6px' }}
                />
              ))}
              <Button
                size="small"
                onClick={() => setReplyTargetId(replyTargetId === m.id ? null : m.id)}
                sx={{ fontSize: '11px', fontWeight: 700, color: '#1E40AF', py: 0 }}
              >
                Reply ({m.replies.length})
              </Button>
            </Box>

            {/* Thread Replies */}
            {m.replies.length > 0 && (
              <Box sx={{ mt: 1, pl: 1.5, borderLeft: '2px solid #DBEAFE', display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {m.replies.map((rep) => (
                  <Box key={rep.id}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      {rep.author} <span style={{ color: '#64748B', fontWeight: 500 }}>· {rep.time}</span>
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: '#334155' }}>
                      {rep.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {replyTargetId === m.id && (
              <form onSubmit={(e) => handleSendReply(e, m.id)}>
                <Box sx={{ display: 'flex', gap: 0.75, mt: 1 }}>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Write threaded reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <Button type="submit" size="small" variant="contained" sx={{ bgcolor: '#1E40AF', borderRadius: '6px' }}>
                    Reply
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        ))}
      </Box>

      <form onSubmit={handlePost}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            fullWidth
            placeholder={`Message ${activeChannel}...`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, minWidth: 44, borderRadius: '6px' }}>
            <SendIcon fontSize="small" />
          </Button>
        </Box>
      </form>

      {/* WebRTC Scientific Huddle Modal */}
      <Dialog open={huddleOpen} onClose={() => setHuddleOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>WebRTC Scientific Huddle — {activeChannel}</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ p: 2.5, borderRadius: '8px', bgcolor: '#0F172A', color: '#F8FAFC', mb: 1.5 }}>
            <Typography variant="caption" sx={{ color: '#93C5FD', fontWeight: 800, display: 'block', mb: 0.5 }}>
              LIVE SCREEN-SHARE CANVAS READY (1080p · DICOM / 3D / PLATE VIEW)
            </Typography>
            <Typography variant="body2" sx={{ color: '#E2E8F0' }}>
              Participants in room: {session.userName}, Dr. Liam Patel, Marcus Chen
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#64748B' }}>
            Peer-reviewed huddle notes and pinned image annotations are automatically archived to the project ELN log.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setHuddleOpen(false)}>Leave Huddle</Button>
          <Button
            variant="contained"
            onClick={() => {
              setHuddleOpen(false);
              onNotify(`Shared live plate/plot view with ${activeChannel}.`);
            }}
            sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}
          >
            Share Active Plot
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
