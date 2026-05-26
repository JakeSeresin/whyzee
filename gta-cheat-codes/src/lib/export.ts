import type { Cheat } from '@/types/cheat';
import type { Game } from '@/types/game';

export function exportToTextFile(cheats: Cheat[], games: Game[]): void {
  const lines: string[] = ['GTA CHEAT CODES — COMPLETE EXPORT\n'];

  for (const game of games) {
    const gameCheats = cheats.filter(c => c.gameId === game.id);
    if (gameCheats.length === 0) continue;
    lines.push('══════════════════════');
    lines.push(game.name.toUpperCase());
    lines.push('══════════════════════');
    for (const cheat of gameCheats) {
      lines.push(`Name: ${cheat.name}`);
      lines.push(`Effect: ${cheat.effect}`);
      lines.push(`PC: ${cheat.pcCode}`);
      lines.push(`PlayStation: ${cheat.playstationCode}`);
      lines.push(`Xbox: ${cheat.xboxCode}`);
      if (cheat.hasAchievementWarning) lines.push('⚠ DISABLES ACHIEVEMENTS');
      lines.push(`Description: ${cheat.description}`);
      lines.push('──────────────────────');
    }
    lines.push('');
  }

  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'gta-cheat-codes.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
