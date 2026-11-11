import React, { useState } from 'react';
import { Box, Chip, MenuItem, Paper, TextField, Tooltip, Typography } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import type { BioSample } from '../../../types';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';

interface TechCryoStoragePanelProps {
  samples: BioSample[];
  onOpenBarcode: (sample: BioSample) => void;
}

const FACILITIES = ['Boston BioHub Bldg 4', 'Cambridge Science Park'];
const FREEZERS = [
  'Cryo-Freezer Ultra -80°C #01',
  'Cryo-Freezer Ultra -80°C #02',
  'Freezer -20°C Unit #05',
  'Cold Storage Room 4°C Unit #3',
];
const SHELVES = ['1', '2', '3', '4'];
const RACKS = ['Rack A', 'Rack B', 'Rack C', 'Rack D'];
const BOX_ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const BOX_COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const TechCryoStoragePanel: React.FC<TechCryoStoragePanelProps> = ({
  samples,
  onOpenBarcode,
}) => {
  const [facility, setFacility] = useState(FACILITIES[0]);
  const [freezer, setFreezer] = useState(FREEZERS[1]);
  const [shelf, setShelf] = useState('2');
  const [rack, setRack] = useState('Rack B');

  const samplesInScope = samples.filter(
    (s) =>
      s.storageLocation.facility === facility &&
      s.storageLocation.freezer === freezer
  );

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0, width: '100%' }}
    >
      <DashboardSectionHeader
        title="Cryogenic Storage Hierarchy Explorer"
        subtitle="Facility → Freezer (-80°C / -20°C / 4°C) → Shelf → Rack → Cryo Box Slot Map"
        moduleRef="2.3"
        rightSlot={
          <Chip
            icon={<AcUnitIcon sx={{ fontSize: '15px !important', color: '#1E40AF !important' }} />}
            label={`${samplesInScope.length} specimens in selected freezer`}
            sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', border: '1px solid #DBEAFE', fontWeight: 700, borderRadius: '6px' }}
          />
        }
      />

      {/* Hierarchy Selectors */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', lg: '1.3fr 1.5fr 0.7fr 0.9fr' },
          gap: 1.5,
          mb: 2.5,
          '& > *': { minWidth: 0 },
        }}
      >
        <TextField select size="small" fullWidth label="Facility" value={facility} onChange={(e) => setFacility(e.target.value)}>
          {FACILITIES.map((f) => (
            <MenuItem key={f} value={f}>{f}</MenuItem>
          ))}
        </TextField>
        <TextField select size="small" fullWidth label="Freezer / Cryo Unit" value={freezer} onChange={(e) => setFreezer(e.target.value)}>
          {FREEZERS.map((fr) => (
            <MenuItem key={fr} value={fr}>{fr}</MenuItem>
          ))}
        </TextField>
        <TextField select size="small" fullWidth label="Shelf" value={shelf} onChange={(e) => setShelf(e.target.value)}>
          {SHELVES.map((sh) => (
            <MenuItem key={sh} value={sh}>Shelf {sh}</MenuItem>
          ))}
        </TextField>
        <TextField select size="small" fullWidth label="Rack" value={rack} onChange={(e) => setRack(e.target.value)}>
          {RACKS.map((rk) => (
            <MenuItem key={rk} value={rk}>{rk}</MenuItem>
          ))}
        </TextField>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1.15fr) minmax(0, 1fr)' },
          gap: 2.5,
          '& > *': { minWidth: 0 },
        }}
      >
        {/* 8x9 Cryo Box Grid */}
        <Box sx={{ minWidth: 0, p: { xs: 1.5, sm: 2 }, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 0.75, mb: 1.25 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
              <Inventory2Icon sx={{ color: '#1E40AF', fontSize: 18, flexShrink: 0 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                Cryo Box Map · {rack} / Shelf {shelf}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              72-Slot Cryo Matrix
            </Typography>
          </Box>
          <Box sx={{ overflowX: 'auto', pb: 0.5, width: '100%' }}>
            <Box sx={{ minWidth: 280, display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 0.5 }}>
              {BOX_ROWS.flatMap((r) =>
                BOX_COLS.map((c) => {
                  const coord = `${r}${c}`;
                  const occupant = samples.find(
                    (s) =>
                      s.storageLocation.well === coord &&
                      s.storageLocation.freezer === freezer
                  );
                  return (
                    <Tooltip
                      key={coord}
                      title={occupant ? `${coord}: ${occupant.id} (${occupant.name})` : `${coord}: Empty Slot`}
                    >
                      <Box
                        onClick={() => occupant && onOpenBarcode(occupant)}
                        sx={{
                          aspectRatio: '1 / 1',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '9.5px',
                          fontWeight: 800,
                          cursor: occupant ? 'pointer' : 'default',
                          bgcolor: occupant ? '#1E40AF' : '#FFFFFF',
                          color: occupant ? '#FFFFFF' : '#94A3B8',
                          border: `1px solid ${occupant ? '#1E3A8A' : '#E2E8F0'}`,
                        }}
                      >
                        {coord}
                      </Box>
                    </Tooltip>
                  );
                })
              )}
            </Box>
          </Box>
        </Box>

        {/* Freezer Specimen Roster */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5, wordBreak: 'break-word' }}>
            Aliquots Stored in {freezer}
          </Typography>
          {samplesInScope.length > 0 ? (
            samplesInScope.map((s) => (
              <Box
                key={s.id}
                onClick={() => onOpenBarcode(s)}
                sx={{
                  p: 1.25,
                  borderRadius: '8px',
                  bgcolor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 1,
                  '&:hover': { borderColor: '#93C5FD', bgcolor: '#EFF6FF' },
                }}
              >
                <Box sx={{ minWidth: 0, flex: '1 1 180px' }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)', wordBreak: 'break-word', display: 'block' }}>
                    {s.id} · Box {s.storageLocation.boxId} ({s.storageLocation.well})
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px', wordBreak: 'break-word' }}>
                    {s.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B' }}>
                    {s.volumeUl} µL · F/T {s.freezeThawCycles}/{s.maxRecommendedCycles}
                  </Typography>
                </Box>
                <StatusChip label={s.status} />
              </Box>
            ))
          ) : (
            <Box sx={{ p: 2, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px dashed #CBD5E1' }}>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                No specimens currently assigned to {facility} / {freezer}. Switch freezer or accession a sample into this unit.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};
