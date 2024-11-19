'use client';

import Select, { Props as SelectProps } from 'react-select';
import { useState, useEffect } from 'react';

export function SelectWrapper(props: SelectProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-full bg-gray-100 rounded" />;
  }

  return (
    <Select
      {...props}
      components={{
        ...props.components,
        IndicatorSeparator: () => null
      }}
    />
  );
} 