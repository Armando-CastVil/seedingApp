import { DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { dummymatches } from '../components/dummymatches';
import React from 'react';
export default function Bracket() {
    return  <DoubleEliminationBracket
    matches={dummymatches}
    matchComponent={Match}
    svgWrapper={({ children, ...props }) => (
      <SVGViewer width={500} height={500} {...props}>
        {children}
      </SVGViewer>
    )}
  />
  }