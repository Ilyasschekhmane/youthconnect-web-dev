"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

export function CitySwitcher({ cities, selectedCityId }: { cities: { id: string; name: string }[]; selectedCityId?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value;
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (cityId) params.set('cityId', cityId);
    else params.delete('cityId');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="inline-flex items-center gap-3">
      <label htmlFor="city-switcher" className="text-sm text-slate-300">City</label>
      <select
        id="city-switcher"
        value={selectedCityId || ''}
        onChange={onChange}
        className="rounded-md bg-slate-800 text-white px-3 py-1 text-sm border border-slate-700"
      >
        <option value="">All cities</option>
        {cities.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
    </div>
  );
}
