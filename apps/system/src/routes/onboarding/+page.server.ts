import { OnboardingSchema } from '$lib/schema';
import { fail, redirect } from '@sveltejs/kit';
import { ZodError } from 'zod';
import type { Actions } from './$types';
import { GenerateCode } from '$lib/utils';
import { supabase } from '$lib/supabase/client';
import type { Database } from '$lib/supabase/database.types';

type Company = Database['public']['Tables']['companies']['Row'];

export async function load({ locals }) {
	const { user } = locals;

	const { data: membership } = await supabase
		.from('memberships')
		.select('*')
		.eq('user_id', user?.id!)
		.single();

	// Redirect the user to the dashboard if there's an existing membership (if the user is already in a company)
	if (membership) {
		throw redirect(302, '/');
	}
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { user } = locals;

		const form = await request.formData();
		const formEntries = Object.fromEntries(form);

		try {
			const { company_code, company_name, company_logo } = OnboardingSchema.parse(formEntries);
			if (company_name && company_logo) {
				// Define a unique path for the image (e.g., using the user ID and file name)
				const filePath = `${user?.id}/${company_logo.name}`;

				const { error: ImageUploadError } = await supabase.storage
					.from('companies_logos')
					.upload(filePath, company_logo, {
						upsert: false
					});

				if (ImageUploadError) {
					return fail(404, {
						message: ImageUploadError.message
					});
				}

				const { data: publicUrlData } = supabase.storage
					.from('companies_logos')
					.getPublicUrl(filePath);

				const { error: CompanyCreationError } = await supabase.from('companies').insert({
					name: company_name,
					code: GenerateCode(),
					logo_url: publicUrlData?.publicUrl,
					user_id: user?.id
				});

				if (CompanyCreationError) {
					return fail(404, {
						message: CompanyCreationError.message
					});
				}

				const { data: companyData, error: companyFetchError } = await supabase
					.from('companies')
					.select('id')
					.eq('user_id', user?.id!)
					.single<Company>();

				if (companyFetchError || !companyData) {
					return fail(404, {
						message: 'Could not retrieve company ID'
					});
				}

				const { error: membershipCreationError } = await supabase.from('memberships').insert({
					company_id: companyData.id,
					user_id: user?.id,
					is_admin: true,
					is_active: true
				});

				if (membershipCreationError) {
					return fail(404, {
						message: membershipCreationError.message
					});
				}
			}
			if (company_code) {
				const { data: CompanyData, error: CompanyError } = await supabase
					.from('companies')
					.select('*')
					.eq('code', company_code)
					.single<Company>();

				if (CompanyData?.user_id === user?.id) {
					return fail(404, {
						message: 'You cannot send a request to join a company you created.'
					});
				}

				if (CompanyError) {
					return fail(404, {
						message: CompanyError.message
					});
				}

				const { error } = await supabase.from('join_requests').insert({
					user_id: user?.id,
					company_id: CompanyData.id,
					from_admin: false
				});

				if (error) {
					return fail(404, {
						message: error.message
					});
				}

				// let's display a success message when this is successful
			}
		} catch (error) {
			console.log(error);
			if (error instanceof ZodError) {
				const errors = error.errors.reduce(
					(acc, err) => {
						const field = err.path[0];
						acc[field] = err.message;
						return acc;
					},
					{} as Record<string, string>
				);
				return fail(400, {
					field_errors: errors
				});
			}
		}

		throw redirect(302, '/');
	}
};
