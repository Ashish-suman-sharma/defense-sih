import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const formatMarkdown = (text: string): React.ReactNode => {
    // Split by lines to handle line breaks
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Handle empty lines
      if (line.trim() === '') {
        return <br key={lineIndex} />;
      }
      
      // Process each line for markdown formatting
      const parts: React.ReactNode[] = [];
      let remaining = line;
      let partIndex = 0;
      
      while (remaining.length > 0) {
        // Handle bold text **text** or *text*
        const boldMatch = remaining.match(/(\*\*([^*]+)\*\*|\*([^*]+)\*)/);
        if (boldMatch) {
          // Add text before the match
          if (boldMatch.index! > 0) {
            parts.push(remaining.substring(0, boldMatch.index!));
          }
          // Add the bold text
          parts.push(
            <strong key={`${lineIndex}-${partIndex}`} className="font-semibold">
              {boldMatch[2] || boldMatch[3]}
            </strong>
          );
          // Update remaining text
          remaining = remaining.substring(boldMatch.index! + boldMatch[0].length);
          partIndex++;
          continue;
        }
        
        // Handle bullet points
        const bulletMatch = remaining.match(/^[\s]*[\*\-\+]\s+/);
        if (bulletMatch) {
          parts.push(
            <span key={`${lineIndex}-${partIndex}`} className="inline-block w-4">
              •
            </span>
          );
          remaining = remaining.substring(bulletMatch[0].length);
          partIndex++;
          continue;
        }
        
        // Handle numbered lists
        const numberMatch = remaining.match(/^[\s]*\d+\.\s+/);
        if (numberMatch) {
          const number = numberMatch[0].trim().replace('.', '');
          parts.push(
            <span key={`${lineIndex}-${partIndex}`} className="inline-block w-4 font-medium">
              {number}.
            </span>
          );
          remaining = remaining.substring(numberMatch[0].length);
          partIndex++;
          continue;
        }
        
        // No more formatting found, add the rest
        parts.push(remaining);
        break;
      }
      
      return (
        <div key={lineIndex} className="mb-2 last:mb-0">
          {parts}
        </div>
      );
    });
  };

  return (
    <div className={className}>
      {formatMarkdown(content)}
    </div>
  );
}
