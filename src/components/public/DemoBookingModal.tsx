import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Chip,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BiotechIcon from '@mui/icons-material/Biotech';

interface DemoBookingModalProps {
  open: boolean;
  onClose: () => void;
}

export const DemoBookingModal: React.FC<DemoBookingModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    organization: '',
    role: 'Principal Investigator (PI)',
    teamSize: '10 - 25 Researchers',
    primaryInterest: 'LIMS & Sample Logistics',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleReset} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BiotechIcon sx={{ color: '#1E40AF' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A' }}>
            Schedule a Guided Scientific Demo
          </Typography>
        </Box>
        <IconButton onClick={handleReset} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        {submitted ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircleIcon sx={{ fontSize: 64, color: '#10B981', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#0F172A' }}>
              Demo Request Received!
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 420, mx: 'auto', mb: 3 }}>
              Thank you, <strong>{formData.fullName || 'Doctor'}</strong>. A GatsBio Life Sciences Solutions Architect
              will contact you at <strong>{formData.workEmail || 'your institutional email'}</strong> to tailor your
              live walkthrough.
            </Typography>
            <Chip
              icon={<CalendarMonthIcon />}
              label="Calendar Invite Dispatched (Zoom/Teams)"
              sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 600, py: 1, px: 1 }}
            />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Typography variant="body2" sx={{ color: '#64748B', mb: 3 }}>
              Explore how GatsBio connects your samples, protocol execution, and 21 CFR Part 11 audit trails in one unified
              biotech platform.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                label="Full Name & Title"
                placeholder="Dr. Jane Doe, Ph.D."
                required
                fullWidth
                size="small"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />

              <TextField
                label="Institutional / Work Email"
                placeholder="jane.doe@biopharma.com"
                type="email"
                required
                fullWidth
                size="small"
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
              />

              <TextField
                label="Organization / Institute"
                placeholder="Harvard Medical / Apex Therapeutics"
                required
                fullWidth
                size="small"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <TextField
                  select
                  label="Scientific Role"
                  size="small"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <MenuItem value="Principal Investigator (PI)">Principal Investigator (PI)</MenuItem>
                  <MenuItem value="Lab Operations Director">Lab Operations Director</MenuItem>
                  <MenuItem value="Senior Research Scientist">Senior Research Scientist</MenuItem>
                  <MenuItem value="QA / Regulatory Officer">QA / Regulatory Officer</MenuItem>
                  <MenuItem value="Clinical Trial Manager">Clinical Trial Manager</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Laboratory Size"
                  size="small"
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                >
                  <MenuItem value="1 - 10 Researchers">1 - 10 Researchers</MenuItem>
                  <MenuItem value="10 - 25 Researchers">10 - 25 Researchers</MenuItem>
                  <MenuItem value="25 - 100 Researchers">25 - 100 Researchers</MenuItem>
                  <MenuItem value="100+ Enterprise / Multi-Site">100+ Enterprise / Multi-Site</MenuItem>
                </TextField>
              </Box>

              <TextField
                select
                label="Primary Domain of Interest"
                size="small"
                value={formData.primaryInterest}
                onChange={(e) => setFormData({ ...formData, primaryInterest: e.target.value })}
              >
                <MenuItem value="LIMS & Sample Logistics">LIMS & 96-Well Sample Logistics</MenuItem>
                <MenuItem value="Electronic Lab Notebook (ELN)">Electronic Lab Notebook (ELN) & Protocols</MenuItem>
                <MenuItem value="FDA 21 CFR Part 11 Compliance">FDA 21 CFR Part 11 & GMP Audit Trails</MenuItem>
                <MenuItem value="AI Research Engine">AI Research Engine & Literature Synthesis</MenuItem>
                <MenuItem value="All-in-One Life Sciences Platform">All-in-One Life Sciences Platform</MenuItem>
              </TextField>

              <TextField
                label="Specific Assays or Requirements (Optional)"
                placeholder="e.g. CRISPR screens, Illumina NGS pipelines, -80°C freezer barcoding..."
                multiline
                rows={2}
                fullWidth
                size="small"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </Box>

            <DialogActions sx={{ px: 0, pt: 3 }}>
              <Button onClick={onClose} sx={{ color: '#64748B' }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#1E40AF',
                  '&:hover': { bgcolor: '#1E3A8A' },
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                }}
              >
                Confirm Demo Session
              </Button>
            </DialogActions>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
