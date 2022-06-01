import {
	getCertificates,
	CertificatesResponse,
	tableSortToAPI,
	tableFiltersToAPI,
} from "api/npm";
import { useQuery } from "react-query";

const fetchCertificates = (
	offset = 0,
	limit = 10,
	sortBy?: any,
	filters?: any,
) => {
	return getCertificates(
		offset,
		limit,
		tableSortToAPI(sortBy),
		tableFiltersToAPI(filters),
	);
};

const useCertificates = (
	offset = 0,
	limit = 10,
	sortBy?: any,
	filters?: any,
	options = {},
) => {
	return useQuery<CertificatesResponse, Error>(
		["hosts", { offset, limit, sortBy, filters }],
		() => fetchCertificates(offset, limit, sortBy, filters),
		{
			keepPreviousData: true,
			staleTime: 15 * 1000, // 15 seconds
			...options,
		},
	);
};

export { fetchCertificates, useCertificates };